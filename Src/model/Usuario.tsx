export class Usuario {
    public userId       : string;
    public userNome     : string;
    public userEmail    : string;
    public userSenha    : string;

    constructor(obj?: Partial<Usuario>){
        if(obj){
            this.userId     = obj.userId
            this.userNome   = obj.userNome
            this.userEmail  = obj.userEmail
            this.userSenha  = obj.userSenha
        }
    }

    toString(){
        const objeto =`{
        "userId"        :"${this.userId}",
        "userNome"      :"${this.userNome}",
        "userEmail"     :"${this.userEmail}",
        "userSenha"     :"${this.userSenha}",
        }`

        return objeto
    }

    Firestore(){
        const usuario = {
            userId      : this.userId,     
            userNome    : this.userNome,   
            userEmail   : this.userEmail,  
            userSenha   : this.userSenha  
        }
        return usuario

    }


}