
<!-- 1 getting a tenant, (--ssl-no-revoke) in certain case: -->

<!--
$ curl (--ssl-no-revoke) -X POST "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants"   -H "Content-Type: application/json"   -H "x-zocom: yum-JAaNDtW2DyvIHS96"   -d "{\"name\": \"uniqueName\"}" -->

<!-- $ curl --ssl-no-revoke -X POST "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants"   -H "Content-Type: application/json"   -H "x-zocom: yum-JAaNDtW2DyvIHS96"   -d "{\"name\": \"Yaliuka\"}" -->

<!-- {"id":"ii25","name":"Yaliuka"} -->
<!-- {"id":"mq65","name":"Vitaly"} -->






<!-- Order:

$ curl --ssl-no-revoke -X POST "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/mq65/orders"   -H "Content-Type: application/json"   -H "x-zocom: yum-JAaNDtW2DyvIHS96"   -d '{

  "items": [
    17
  ]
}
     ' -->




<!-- Tenant:

name = 'Vitaly', tenantID = 'mq65' -->
