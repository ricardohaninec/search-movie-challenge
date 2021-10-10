import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.model';


@Injectable()
export abstract class BaseService<TModel> {
    
    protected serviceName: string;

    constructor(@SkipSelf() protected http: HttpClient) {
    }

    protected get url(): string {
        return environment.apiEndpoint + this.serviceName;
    }

    public getById(id: number): Observable<BaseResponse<TModel>> {
        return this.http.get<BaseResponse<TModel>>(`${this.url}/${id}/`);
    }

    public getByUuid(uuid: string): Observable<BaseResponse<TModel>> {
        return this.http.get<BaseResponse<TModel>>(`${this.url}/${uuid}/`);
    }

    public get(querystring?: string): Observable<BaseResponse<TModel[]>> { 
        let url = `${this.url}`;
        if (querystring && querystring.length > 0) {
            url = url + '?' + querystring;
        }

        return this.http.get<BaseResponse<TModel[]>>(url);
    }

    public saveById(model: any): Observable<BaseResponse<TModel>> {
        if (model.id) {
            return this.put(model);
        } else {
            return this.post(model);
        }
    }

    public saveByUuid(model: any): Observable<BaseResponse<TModel>> {
        if (model.uuid) {
            return this.put(model);
        } else {
            return this.post(model);
        }
    }

    public post(model: any): Observable<BaseResponse<TModel>> {
        return this.http.post<BaseResponse<TModel>>(`${this.url}`, model);
    }

    public put(model: any): Observable<BaseResponse<TModel>> {
        return this.http.put<BaseResponse<TModel>>(`${this.url}/${model.uuid}/`, model);
    }

    public active(model: any): Observable<BaseResponse<TModel>> {
        return this.http.patch<BaseResponse<TModel>>(`${this.url}/${model.id}/active`, model);
    }
    
    public delete(uuid: any): Observable<BaseResponse<TModel>> {
        return this.http.delete<BaseResponse<TModel>>(`${this.url}/${uuid}/`);
    }
    
}