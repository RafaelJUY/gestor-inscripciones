export class AuthMockService{
  login(){
    console.log("Ejecutando login falso");
    return {
      name: "FAKE USER",
      email: "...",
    };
  }

  verificarToken(){}

  obtenerUsuarioAutenticado(){}
}
