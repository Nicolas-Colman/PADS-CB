export class infoComplementar {
    public infoCompAnexos : string | undefined;
    public infoCompStatus : Date   | undefined;
    public ocorId         : string | undefined;
    
    constructor(obj?: Partial<infoComplementar>){
        if (obj){
            this.infoCompAnexos = obj.infoCompAnexos
            this.infoCompStatus = obj.infoCompStatus
            this.ocorId         = obj.ocorId
        }
    }

    toString(){
        const objeto=`{
            "infoCompAnexos"   : "${this.infoCompAnexos}",
            "infoCompStatus"   : "${this.infoCompStatus}",
            "ocorId"           : "${this.ocorId}
        }`
        return objeto
    }

    toFirestore(){
        const infoComplementar={
            infoCompAnexos  : this.infoCompAnexos,
            infoCompStatus  : this.infoCompStatus,
            ocorId          : this.ocorId
            
        }
        return infoComplementar
    }

}