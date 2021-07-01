import { Dictionary } from "./Dictionary";
import { Lock } from 'semaphore-async-await'//https://libraries.io/npm/semaphore-async-await
import * as api from "../common/api";
//سمت سرور پیام ها را ترانسلیت می کند
export class Translator {
  private static dict_persion: Dictionary<string, string> = new Dictionary<string, string>();
  private static dict_english: Dictionary<string, string> = new Dictionary<string, string>();
  private static m_lock: Lock;
  constructor() {
    Translator.dict_persion = new Dictionary<string, string>();
    Translator.dict_english = new Dictionary<string, string>();
  }
  private static language_persian_init() {
    Translator.dict_persion.add("not_found".toLowerCase(), "پیدا نشد");
    Translator.dict_persion.add("user_not_found".toLowerCase(), "کاربر مورد نظر یافت نشد");
    Translator.dict_persion.add("Invalid_password_or_username".toLowerCase(), "رمز یا نام کاربری نامعتبر می باشد");
    Translator.dict_persion.add("Database_Error".toLowerCase(), "خطای بانک اطلاعاتی ");
    Translator.dict_persion.add("USE_IN_ANOTHER_TABLE".toLowerCase(), "در جدولی دیگر از این آیتم استفاده شده");
    Translator.dict_persion.add("THE_RECORD_CANNOT_BE_DELETED".toLowerCase(), "این رکورد را نمی شود حذف کرد");
    Translator.dict_persion.add("THE_RECORD_ALREADY_EXISTS".toLowerCase(), "این آیتم قبلا درج شده");
    //maria db error key 
    Translator.dict_persion.add("ER_ROW_IS_REFERENCED_2".toLowerCase(), "در جدولی دیگر از این آیتم استفاده شده");
    Translator.dict_persion.add("ER_DUP_ENTRY".toLowerCase(), "این آیتم قبلا درج شده");

  }
  private static language_english_init() {
    Translator.dict_english.add("not_found".toLowerCase(), "Not Found");
    Translator.dict_english.add("user_not_found".toLowerCase(), "User Not Found");
    Translator.dict_english.add("Invalid_password_or_username".toLowerCase(), "Invalid password or username");
    Translator.dict_english.add("Database_Error".toLowerCase(), "Database Error");
    Translator.dict_english.add("USE_IN_ANOTHER_TABLE".toLowerCase(), "Use in another table");
    Translator.dict_english.add("THE_RECORD_CANNOT_BE_DELETED".toLowerCase(), "The record cannot be deleted");
    Translator.dict_english.add("THE_RECORD_ALREADY_EXISTS".toLowerCase(), "the record already exists");
    //maria db error key 
    Translator.dict_english.add("ER_ROW_IS_REFERENCED_2".toLowerCase(), "Use in another table");
    Translator.dict_english.add("ER_DUP_ENTRY".toLowerCase(), "the record already exists");
    

  }
  public static async init() {
    Translator.m_lock = new Lock();
    Translator.language_persian_init();
    Translator.language_english_init();
  }
  public static doTranslate(key: string, lang: api.XGlobal.En_Language) {
    Translator.m_lock.acquire();
    var result: string = key.toLowerCase();
    if (lang == api.XGlobal.En_Language.English) {
      result = this.dict_english.getValue(key.toLowerCase())
    } else if (lang == api.XGlobal.En_Language.Persin) {
      result = this.dict_persion.getValue(key.toLowerCase())
    }
    if (result === null || result === "")
      result = key;
    Translator.m_lock.release();

    return result;

  }


}