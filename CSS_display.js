<div class='container'>
  <div class='sq'>
    <div class='circle'>
    </div>
  </div>
   <div class='sq'>
    <div class='circle'>
    </div>
  </div>
   <div class='sq'>
    <div class='circle'>
    </div>
  </div>
</div>

.container {
  border: 1px solid black;
  display: flex;
}

.sq {
  height:100px;
  width: 100px;
  display: flex;
  background-color: red;
  margin: 10px;
  
}

.circle {
  height: 50px;
  width:  50px;
  border-radius: 50%;
  margin: auto;
  background-color: yellow;
}
