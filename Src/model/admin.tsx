export class Admin {
    public adminEmail   : string    | undefined;
    public adminId      : string    | undefined;
    public adminNome    : string    | undefined;
    
    constructor(obj?: Partial<Admin>){
        if (obj){
            this.adminEmail = obj.adminEmail
            this.adminId    = obj.adminId
            this.adminNome  = obj.adminNome
        }
    }

    toString(){
        const objeto=`{
            "adminEmail"    : "${this.adminEmail}",
            "adminId"       : "${this.adminId}",
            "adminNome"     : "${this.adminNome}
        }`
        return objeto
    }

    toFirestore(){
        const admin={
            adminEmail  : this.adminEmail,
            adminId     : this.adminId,
            adminNome   : this.adminNome
            
        }
        return admin
    }

}