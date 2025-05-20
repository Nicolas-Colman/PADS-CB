export class Chamados {
    public adminId          : string    | undefined;
    public chamDataCriacao  : Date      | undefined;
    public chamId           : string    | undefined;
    public chamStatus       : string    | undefined;
    public ocorId           : string    | undefined;
    public prestId          : string    | undefined;

    constructor(obj?: Partial<Chamados>){
        if (obj){
            this.adminId          = obj.adminId
            this.chamDataCriacao  = obj.chamDataCriacao
            this.chamId           = obj.chamId
            this.chamStatus       = obj.chamStatus
            this.ocorId           = obj.ocorId
            this.prestId          = obj.prestId
        }
    }

    toString(){
        const objeto=`{
            "adminId"           : "${this.adminId}",
            "chamDataCriacao"   : "${this.chamDataCriacao}",
            "chamId"            : "${this.chamId}",
            "chamStatus"        : "${this.chamStatus}",
            "ocorId"            : "${this.ocorId},
            "prestId"           : "${this.prestId}"
        }`
        return objeto
    }

    toFirestore(){
        const chamados={
            adminId          : this.adminId,
            chamDataCriacao  : this.chamDataCriacao,
            chamId           : this.chamId,
            chamStatus       : this.chamStatus,
            ocorId           : this.ocorId,
            prestId          : this.prestId
        }
        return chamados
    }


}