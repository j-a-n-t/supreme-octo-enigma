import colors from "colors";
import mongoose, {connect} from "mongoose";

type PropsDB = {
    uriDB: string;
}

class ConnectDB {
    private readonly uriDB: string;

    constructor({uriDB}: PropsDB) {
        this.uriDB = uriDB;
    }

    public connected(): void {
        mongoose.connect(this.uriDB).then(() => {
            console.log(colors.bgGreen(" 🤖 Database connected 🤖 "));
        }).catch((err) => {
            console.log(colors.bgRed(" 🤡 Database not connected " + err + " 🤡 "));
        });
    }
}

export {ConnectDB};