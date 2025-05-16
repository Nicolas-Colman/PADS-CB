export class Cliente {
    public userEmail    : string    | undefined;
    public userId       : string    | undefined;
    public userNome     : string    | undefined;
    public userRole     : string    | undefined;
    public userUrlFoto  : string    | undefined;
        
    constructor(obj?: Partial<Cliente>){
        if (obj){
            this.userEmail      = obj.userEmail
            this.userId         = obj.userId
            this.userNome       = obj.userNome
            this.userRole       = obj.userRole
            this.userUrlFoto    = obj.userUrlFoto
        }
    }

    toString(){
        const objeto=`{
            "userEmail"     : "${this.userEmail}",
            "userId"        : "${this.userId}",
            "userNome"      : "${this.userNome}",
            "userRole"      : "${this.userRole}",
            "userUrlFoto"   : "${this.userUrlFoto}"
        }`

        return objeto
    }

    toFirestore(){
        const cliente={
            userEmail   : this.userEmail,
            userId      : this.userId,
            userNome    : this.userNome,
            userRole    : this.userRole,
            userUrlFoto : this.userUrlFoto
            
        }
        return cliente
    }


}