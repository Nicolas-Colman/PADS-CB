export class Relatorio {
    public adminId          : string    | undefined;
    public relaConteudo     : string    | undefined;
    public relaDataGeracao  : Date      | undefined;
    public relaId           : string    | undefined;
        
    constructor(obj?: Partial<Relatorio>){
        if (obj){
            this.adminId            = obj.adminId
            this.relaConteudo       = obj.relaConteudo
            this.relaDataGeracao    = obj.relaDataGeracao
            this.relaId             = obj.relaId
        }
    }

    toString(){
        const objeto=`{
            "adminId"           : "${this.adminId}",
            "relaConteudo"      : "${this.relaConteudo}",
            "relaDataGeracao"   : "${this.relaDataGeracao}",
            "relaId"            : "${this.relaId}",
        }`

        return objeto
    }

    toFirestore(){
        const relatorio={
            adminId         : this.adminId,
            relaConteudo    : this.relaConteudo,
            relaDataGeracao : this.relaDataGeracao,
            relaId          : this.relaId,
            
        }
        return relatorio
    }


}