import "reflect-metadata";

import { ServiceHttps_s } from "./services/ServiceHttps";
import { SP } from "./SP";
import { ServiceDatabase } from "./services/ServiceDatabase";

(async () => {
    //------------------------- INIT APP
    // let d1:number =SP.UnixTime();
    // let d2:number = SP.addSecs(d1, 60);
    // console.log("x1:"+d1 + " "+ SP.UnixTime_to_Date(d1).toLocaleString());
    // console.log("x2:"+d2 + " "+ SP.UnixTime_to_Date(d2).toLocaleString());
    let s1 = await SP.getObj().SP_Post_init();
    let s2 = await new ServiceDatabase().run();
    if (s2 === true) {
        let s4 = await SP.getObj().SP_init();
       
        let s3 = await SP.Server_https_obj.listen();
      
    }else{
        console.log("There has been an error in db......")
    }






})();



