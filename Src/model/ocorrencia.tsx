export class Ocorrencia {
    public ocorDataRegistro : Date | undefined;
    public ocorDescricao    : string    | undefined;
    public ocorTipo         : string    | undefined;
    public ocorId           : string    | undefined;
    public ocorEndereco     : string    | undefined;
    public ocorLatitude     : number    | undefined;
    public ocorLongitude    : number    | undefined;
    public userId           : string    | undefined;
    public ocorUrlFoto      : string    | undefined;
    public ocorLike         : number    | undefined;
    public ocorDeslike      : number    | undefined;
    
    constructor(obj?: Partial<Ocorrencia>){
        if (obj){
            this.ocorDataRegistro   = obj.ocorDataRegistro
            this.ocorDescricao      = obj.ocorDescricao
            this.ocorId             = obj.ocorId
            this.ocorTipo           = obj.ocorTipo 
            this.ocorLatitude       = obj.ocorLatitude
            this.ocorLongitude      = obj.ocorLongitude
            this.ocorEndereco       = obj.ocorEndereco
            this.userId             = obj.userId
            this.ocorUrlFoto        = obj.ocorUrlFoto
            this.ocorLike           = obj.ocorLike
            this.ocorDeslike        = obj.ocorDeslike
        }
    }

    toString(){
        const objeto=`{
            "ocorDataRegistro"  : "${this.ocorDataRegistro}",
            "ocorDescricao"     : "${this.ocorDescricao}",
            "ocorId"            : "${this.ocorId}
            "ocorTipo"          : "${this.ocorTipo}
            "ocorLatitude"      : "${this.ocorLatitude}",
            "ocorLongitude"     : "${this.ocorLongitude}",
            "ocorEndereco"      : "${this.ocorEndereco}",
            "userId"            : "${this.userId}"
            "ocorUrlFoto"       : "${this.ocorUrlFoto}"
            "ocorLike"          : "${this.ocorLike}"
            "ocorDeslike"       : "${this.ocorDeslike}"
        }`
        return objeto
    }

    toFirestore(){
        const ocorrencia={
            ocorDataRegistro    : this.ocorDataRegistro,
            ocorDescricao       : this.ocorDescricao,
            ocorId              : this.ocorId,
            ocorTipo            : this.ocorTipo,
            ocorLatitude        : this.ocorLatitude, 
            ocorLongitude       : this.ocorLongitude, 
            ocorEndereco        : this.ocorEndereco, 
            userId              : this.userId,
            ocorUrlFoto         : this.ocorUrlFoto,
            ocorLike            : this.ocorLike,
            ocorDeslike         : this.ocorDeslike,
            
        }
        return ocorrencia
    }

}