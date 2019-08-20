<?php

  namespace app\Controllers;

  class OrderController extends Controllers{

    function insertOrder($request,$response) {
      $order = $request->getParsedBody();
      //var_dump($order['cart']);die();
      $message = $this->OrderModel->insertOrder($order);
      return json_encode($message);
    }
    public function getOrders($request, $response) { 
      $message = $this->OrderModel->getOrders();
      return json_encode($message);
    }
    public function getOrdersDetails($request, $response) {
      $message = $this->OrderModel->getOrdersDetails();
      return json_encode($message);
    }
  }
  
?>
