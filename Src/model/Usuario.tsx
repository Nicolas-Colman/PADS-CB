export class Usuario {
    public userId       : string | undefined;
    public userNome     : string | undefined;
    public userEmail    : string | undefined;
    public userSenha    : string | undefined;
    public userRepSenha : string | undefined;
    public userRole     : string | undefined;
    public userUrlFoto  : string | undefined;

    constructor(obj?: Partial<Usuario>){
        if(obj){
            this.userId     = obj.userId
            this.userNome   = obj.userNome
            this.userEmail  = obj.userEmail
            this.userSenha  = obj.userSenha
            this.userRepSenha  = obj.userRepSenha
            this.userRole  = obj.userRole
        }
    }

    toString(){
        const objeto =`{
        "userId"        :"${this.userId}",
        "userNome"      :"${this.userNome}",
        "userEmail"     :"${this.userEmail}",
        "userSenha"     :"${this.userSenha}",
        "userRepSenha"     :"${this.userRepSenha}",
        "userRole"     :"${this.userRole}",
        }`

        return objeto
    }

    Firestore(){
        const usuario = {
            userId      : this.userId,     
            userNome    : this.userNome,   
            userEmail   : this.userEmail,  
            userSenha   : this.userSenha, 
            userRepSenha   : this.userRepSenha, 
            userRole   : this.userRole  
        }
        return usuario

    }


}