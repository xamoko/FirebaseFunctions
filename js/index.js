firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  console.log(userEmail+""+userPass);

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}

var db = firebase.firestore();
function enviar() {

    var nom = document.getElementById("nombre").value;
    var num = document.getElementById("numero").value;
    var cor = document.getElementById("agregarcorreo").value;

db.collection("reclutamiento").doc(nom).set({
    nombre: nom,
    numero: num,
    correo: cor
})
.then(function() {
    
    document.getElementById("formulario").reset();
    $('#exampleModal').modal('hide');
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}

window.onload = function mostrar(){
  
  db.collection("reclutamiento").onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      if(change.type === "added"){
        // doc.data() is never undefined for query doc snapshots
        console.log(change.doc.data().nombre);
        let div = document.getElementById("tabla");
        div.innerHTML += '<tr><th scope="row"></th><td>'+change.doc.data().nombre+'</td><td>'+change.doc.data().numero+'</td><td>'+change.doc.data().correo+'</td><td><i onclick="mail.js" class="fa fa-envelope" aria-hidden="true"></i></td></tr>';
      }
      });
    });
}

function mail(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    console.log(name+" "+email);

  db.collection("bienvenida").add({name,email}).then(r => {
          console.log(r);
          alert("listo");
        });
}

 <div class="container">
        <!-- Content here -->
        <div id="login_div" class="card login main-div" style="width: 18rem;">
            <div class="card-body">
                <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Usuario</label>
                      <input type="email" class="form-control" id="email_field" aria-describedby="emailHelp" required>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Contraseña</label>
                      <input type="password" class="form-control" id="password_field" required>
                    </div>
                    <button type="submit" class="btn btn-success" onclick="login()">Submit</button>
                  </form>
            </div>
          </div>

          <div id="user_div" class="loggedin-div login">
            
            <div class="container">
  <div class="row">
    <div class="col">
      <h3>Bienvenido</h3>
      <p id="user_para">Welcome to Firebase web login Example. You're currently logged in.</p>
    </div>
    <div class="col" style="text-align: right;">
      <i type="button" style="font-size: 25px;" class="fa fa-plus-square" aria-hidden="true" data-toggle="modal" data-target="#exampleModal"></i>
    </div>
        <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Agregar Cliente</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form id="formulario">
          <div class="form-group">
            <label for="exampleFormControlInput1">Nombre</label>
            <input type="text" class="form-control" id="nombre" placeholder="Nombre">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Número</label>
            <input type="number" class="form-control" id="numero" placeholder="Nombre">
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Correo</label>
            <input type="email" class="form-control" id="agregarcorreo" placeholder="name@example.com">
          </div>
  
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar  <i class="fa fa-times-circle" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-success" onclick="enviar()">Guardar   <i class="fa fa-floppy-o" aria-hidden="true"></i></button>
      </div>
    </form>
    </div>
  </div>
</div>
    
    <div class="w-100"></div>
    <div class="col" >
      <table class="table jumbotron jumbotron-fluid">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Nombre</th>
      <th scope="col">Número</th>
      <th scope="col">Correo</th>
    </tr>
  </thead>
  <tbody id="tabla">
   
  </tbody>
      </table>
    </div>
    <div class="w-100"></div>
    <div class="col">
      <button type="submit" class="btn btn-danger" onclick="logout()">Cerrar Sesion</button>
            <button type="submit" class="btn btn-success" onclick="enviar()">Enviar</button>
    </div>
  </div>
</div>
            
            
          </div>
    </div>
