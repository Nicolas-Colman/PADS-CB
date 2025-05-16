export class Notificacao {
    public notAtualizacao   : string | undefined;
    public notDataEnvio     : Date | undefined;
    public notId            : string | undefined;
    public notMensagem      : string | undefined;
    public notTipo          : string | undefined;
    public userId           : string | undefined;

    constructor(obj?: Partial<Notificacao>){
        if (obj){
            this.notAtualizacao = obj.notAtualizacao
            this.notDataEnvio   = obj.notDataEnvio
            this.notId          = obj.notId
            this.notMensagem    = obj.notMensagem
            this.notTipo        = obj.notTipo
            this.userId         = obj.userId
        }
    }

    toString(){
        const objeto=`{
            "notAtualizacao"   : "${this.notAtualizacao}",
            "notDataEnvio"     : "${this.notDataEnvio}",
            "notId"            : "${this.notId}",
            "notMensagem"      : "${this.notMensagem}",
            "notTipo"          : "${this.notTipo}",
            "userId"           : "${this.userId}"
        }`
        return objeto
    }

    toFirestore(){
        const notificacao={
            notAtualizacao  : this.notAtualizacao,
            notDataEnvio    : this.notDataEnvio,
            notId           : this.notId,
            notMensagem     : this.notMensagem,
            notTipo         : this.notTipo,
            userId          : this.userId
        }
        return notificacao
    }


}