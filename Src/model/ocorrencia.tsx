export class Ocorrencia {
    public ocorDataRegistro : Date      | undefined;
    public ocorDescricao    : string    | undefined;
    public ocorTipo         : string    | undefined;
    public ocorId           : string    | undefined;
    public ocorEndereco     : string    | undefined;
    public ocorLocalizacao  : string    | undefined;
    public userId           : string    | undefined;
    public ocorUrlFoto      : string    | undefined;
    
    constructor(obj?: Partial<Ocorrencia>){
        if (obj){
            this.ocorDataRegistro   = obj.ocorDataRegistro
            this.ocorDescricao      = obj.ocorDescricao
            this.ocorId             = obj.ocorId
            this.ocorTipo           = obj.ocorTipo 
            this.ocorLocalizacao    = obj.ocorLocalizacao
            this.ocorEndereco       = obj.ocorEndereco
            this.userId             = obj.userId
            this.ocorUrlFoto        = obj.ocorUrlFoto
        }
    }

    toString(){
        const objeto=`{
            "ocorDataRegistro"  : "${this.ocorDataRegistro}",
            "ocorDescricao"     : "${this.ocorDescricao}",
            "ocorId"            : "${this.ocorId}
            "ocorTipo"          : "${this.ocorTipo}
            "ocorLocalizacao"   : "${this.ocorLocalizacao}",
            "ocorEndereco"      : "${this.ocorEndereco}",
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
            ocorTipo            : this.ocorTipo,
            ocorLocalizacao     : this.ocorLocalizacao, 
            ocorEndereco        : this.ocorEndereco, 
            userId              : this.userId,
            ocorUrlFoto         : this.ocorUrlFoto
            
        }
        return ocorrencia
    }

}