
<!-- 1 getting a tenant, (--ssl-no-revoke) in certain case: -->

<!--
$ curl (--ssl-no-revoke) -X POST "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants"   -H "Content-Type: application/json"   -H "x-zocom: yum-JAaNDtW2DyvIHS96"   -d "{\"name\": \"uniqueName\"}" -->

<!-- $ curl --ssl-no-revoke -X POST "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants"   -H "Content-Type: application/json"   -H "x-zocom: yum-JAaNDtW2DyvIHS96"   -d "{\"name\": \"Yaliuka\"}" -->

<!-- {"id":"ii25","name":"Yaliuka"} -->
<!-- {"id":"mq65","name":"Vitaly"} -->




<!--  menu
 curl -X 'GET' \
   'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu' \
   -H 'accept: application/json' \
   -H 'x-zocom: yum-JAaNDtW2DyvIHS96'

 "items": [
     {
       "id": 1,
       "type": "wonton",
       "name": "Karlstad",
       "description": "En god friterad wonton med smaker från de värmländska skogarna.",
       "ingredients": [
         "kantarell",
        "scharlottenlök",
         "morot",
         "bladpersilja"
       ],
       "price": 9
     }, -->
	 

<!-- Order:

$ curl --ssl-no-revoke -X POST "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/mq65/orders"   -H "Content-Type: application/json"   -H "x-zocom: yum-JAaNDtW2DyvIHS96"   -d '{

  "items": [
    17
  ]
}
     ' -->




<!-- Tenant:

name = 'Vitaly', tenantID = 'mq65' -->
