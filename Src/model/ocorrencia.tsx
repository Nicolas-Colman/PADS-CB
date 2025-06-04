export class Ocorrencia {
    public ocorDataRegistro : Date      | undefined;
    public ocorDescricao    : string    | undefined;
    public ocorId           : string    | undefined;
    public ocorLocalizacao  : string    | undefined;
    public userId           : string    | undefined;
    public ocorUrlFoto      : string    | undefined;
    
    constructor(obj?: Partial<Ocorrencia>){
        if (obj){
            this.ocorDataRegistro   = obj.ocorDataRegistro
            this.ocorDescricao      = obj.ocorDescricao
            this.ocorId             = obj.ocorId
            this.ocorLocalizacao    = obj.ocorLocalizacao
            this.userId             = obj.userId
            this.ocorUrlFoto        = obj.ocorUrlFoto
        }
    }

    toString(){
        const objeto=`{
            "ocorDataRegistro"  : "${this.ocorDataRegistro}",
            "ocorDescricao"     : "${this.ocorDescricao}",
            "ocorId"            : "${this.ocorId}
            "ocorLocalizacao"   : "${this.ocorLocalizacao}",
            "userId"            : "${this.userId}"
            "ocorUrlFoto"       : "${this.ocorUrlFoto}"
        }`
        return objeto
    }

    toFirestore(){
        const ocorrencia={
            ocorDataRegistro    : this.ocorDataRegistro,
            ocorDescricao       : this.ocorDescricao,
            ocorId              : this.ocorId,
            ocorLocalizacao     : this.ocorLocalizacao,
            userId              : this.userId,
            ocorUrlFoto         : this.ocorUrlFoto
            
        }
        return ocorrencia
    }

}