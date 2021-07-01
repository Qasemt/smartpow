import {JsonController, Get, Post, Param, Delete, Body,ForbiddenError, OnUndefined, NotFoundError} from "routing-controllers";
import {Service} from "typedi";
import {CategoryRepository} from "../repository/CategoryRepository";
import {Category} from "../model/Category";
import {Not_FoundError,UserNotFoundError} from "./../common/MyStatus";
import { NOTFOUND } from "dns";



@Service()
@JsonController()
export class CategoryController {

    constructor(private categoryRepository: CategoryRepository) {
    }

    

    @Get("/categories")
    all(): Promise<Category[]> {
        if(1)
       throw new UserNotFoundError(null);
      //  throw new ValidationError();
        return this.categoryRepository.findAll();
    }

    @Get("/categories/:id")
    one(@Param("id") id: number): Category {
        var t =  this.categoryRepository.findOne(id);
        if(t===undefined)
        throw new Not_FoundError(null);
        return t;
    }

    @Post("/categories")
    category(@Body() category: Category): Category {
        return this.categoryRepository.save(category);
    }

    @Delete("/categories/:id")
    delete(@Param("id") id: number): Category {
        return this.categoryRepository.remove(id);
    }

}