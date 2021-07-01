/**
 * デフォルトエラーハンドラー。
 * @module ./core/default-error-handler
 */
import { Request, Response, NextFunction } from "express";
import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from "routing-controllers";


@Middleware({ type: "after" })
export class AllErrorsHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: Function): void {
       // console.log("Error handled: ", error);
        next(error);
    }
    
}   