import { JsonController, Get, Post, QueryParam, Delete, Body, ForbiddenError, OnUndefined, NotFoundError, Redirect, Res, HeaderParam } from "routing-controllers";
import { Service } from "typedi";
import { SessionRepository } from "../repository/SessionRepository";
import { ProfileRepository } from "../repository/ProfileRepository"
import { SessionInfo } from "../common/SessionInfo";
import { Not_FoundError, UserNotFoundError, InvalidPasswordAndUsernameError } from "./../common/MyStatus";
import { Profile } from "../model/Profile";
import * as api from "../common/api";
export class LoginObjct {
    login: string;
    pass: string;
}

@Service()
@JsonController()
@Redirect("/")
export class SessionManagerController {

    keyGen(keyLength: number) {
        var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        var charactersLength = characters.length;

        for (i = 0; i < keyLength; i++) {
            key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
        }

        return key;
    }

    @Post("/public/home/login")
    async  login( @Body() login_obj: LoginObjct,@HeaderParam("Cookie") cookie: string, @Res() res: any) {
        try {
            let profile_repository = new ProfileRepository();
            let profile: Profile = await profile_repository.findOneByUserName(login_obj.login, login_obj.pass);
            if (profile == null)
                throw new InvalidPasswordAndUsernameError(null);

            let SessionInfo_temp = SessionRepository.findOneByUsrName(profile.userName);
            let has_key_sid:boolean =false;
            if (cookie != undefined) {
                has_key_sid= cookie.indexOf("sid=")>=0;
            }
            if (has_key_sid==false||SessionInfo_temp == null) {
                let session_key_tmp = this.keyGen(30);
                SessionInfo_temp = new SessionInfo(api.XGlobal.En_Language.English, login_obj.login, session_key_tmp);
                SessionRepository.save(session_key_tmp, SessionInfo_temp);
                res.cookie('sid',session_key_tmp , { maxAge: 6546546545645, path: '/' });
                res.setHeader('Location', '/');
            }
            res.end();
        } catch (e) {
            res.status(e.httpCode)
                .send({
                    name: e.name,
                    message: e.message,
                    stack: e.stack
                });

        }

    }

    // @Get("/service/home/login")
    // async  login_post( @QueryParam("username") user_name: string, @QueryParam("pass") pass: string, @Res() res: any) {
    //     try {
    //         let profile_repository = new ProfileRepository();
    //         let profile: Profile = await profile_repository.findOneByUserName(user_name, pass);
    //         if (profile == null)
    //             throw new UserNotFoundError(null);

    //         let SessionInfo_temp = SessionRepository.findOneByUsrName(profile.userName);
    //         if (SessionInfo_temp == null) {
    //             let session_key_tmp = this.keyGen(30);
    //             SessionInfo_temp = new SessionInfo(En_Language.English, user_name, session_key_tmp);
    //             SessionRepository.save(session_key_tmp, SessionInfo_temp);
    //             res.cookie('mycookie', session_key_tmp + ';', { maxAge: 900000, httpOnly: true, path: '/' });
    //             res.redirect('/');
    //         }

    //         // res.status(200)
    //         // .send({
    //         //    message:"success"
    //         // });
    //     } catch (e) {
    //         res.status(e.httpCode)
    //             .send({
    //                 name: e.name,
    //                 message: e.message,
    //                 stack: e.stack
    //             });

    //     }

    // }
    @Get("/home/logout")
    async  logout( @HeaderParam("Cookie") cookie: string, @Res() res: any) {
        try {
            if (cookie != undefined) {

               // var fields = cookie.split(';')
              //  console.log(fields[0]);
              var final_key_sid= cookie.replace("sid=","");
                await SessionRepository.remove(final_key_sid);
                res.clearCookie("sid", { path: '/' });
            }
            res.redirect('/public/home/login');
            res.end();
        } catch (e) {
            res.status(500)
                .send({
                    name: e.name,
                    message: e.message,
                    stack: e.stack
                });

        }

    }
}