<?php
namespace app\Models;

class OrderModel extends Models{


  public function getOrders() {
    $sth = $this->db->pdo->prepare('SELECT 
      orderNumber,
      orderDate,
      requiredDate,
      shippedDate,
      status,
      comments,
      customerNumber FROM orders
      ORDER BY shippedDate DESC'
    );
    $sth->execute();
    if (!is_null($sth->errorInfo()[2]) ) {
      return array(
        'success' => false,
        'description' => $sth->errorInfo()[2]
      );
    } else if (empty($sth)) {
      return array('notFound' => true, 'description' => 'The result is empty');
    }
    return array(
      'success' => true,
      'description' => 'The orders were found',
      'orders' => $sth->fetchAll($this->db->pdo::FETCH_ASSOC)
    );
  }
  public function getOrdersDetails() {
    $sth = $this->db->pdo->prepare('SELECT 
      orderNumber,
      products.productName,
      orderdetails.productCode,
      quantityOrdered,
      priceEach,
      orderLineNumber FROM orderdetails
      INNER JOIN products
      ON orderdetails.productCode = products.productCode'
    );
    $sth->execute();
    if (!is_null($sth->errorInfo()[2]) ) {
      return array(
        'success' => false,
        'description' => $sth->errorInfo()[2]
      );
    } else if (empty($sth)) {
      return array('notFound' => true, 'description' => 'The result is empty');
    }
    return array(
      'success' => true,
      'description' => 'The orderDetails was found',
      'orderDetails' => $sth->fetchAll($this->db->pdo::FETCH_ASSOC)
    );
  }

  function insertOrder($order){

    $orderNumber = time();

    $lines = $order['cart']['lines'];

    $this->db->pdo->beginTransaction();

    $this->db->insert('orders',[
      'orderNumber' => $orderNumber,
      'orderDate' => date('Y-m-d', time()),
      'requiredDate' => date('Y-m-d', time()),
      'status' => 'In Process',
      'comments' => 'first Order',
      'customerNumber' => 496
    ]);

    foreach ($lines as $key => $line) {
      $this->db->insert('orderdetails',[
        'orderNumber' => $orderNumber,
        'productCode' => $line['product']['productCode'],
        'quantityOrdered' => $line['quantity'],
        'priceEach' => $line['product']['MSRP'],
        'orderLineNumber' =>  $key + 1
      ]);
    }

    if (!is_null($this->db->error()[1])) {
      $this->db->pdo->rollback();
      return array('error' => true, 'Description' => $this->db->error()[2]);
    }
    $this->db->pdo->commit();
    return array('success' => true, 'description' => 'order registered');
  }

}

?>
