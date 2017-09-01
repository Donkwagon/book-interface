import { Injectable } from '@angular/core';
import { Tag } from '../classes/tag';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TagService {
    private TagsUrl = '/apis/tag';

    constructor (private http: Http) {}

    getTags(): Promise<Tag[] | void> {
      return this.http.get(this.TagsUrl)
                 .toPromise()
                 .then(response => response.json() as Tag[])
                 .catch(this.handleError);
    }

    getTagsByType(type: String): Promise<Tag[] | void> {
      return this.http.get(this.TagsUrl + '/type/' + type)
                 .toPromise()
                 .then(response => response.json() as Tag[])
                 .catch(this.handleError);
    }

    getTag(TagId: String): Promise<Tag | void> {
      return this.http.get(this.TagsUrl + '/' + TagId)
                 .toPromise()
                 .then(response => response.json() as Tag)
                 .catch(this.handleError);
    }

    createTag(newTag: Tag): Promise<Tag | void> {
      let data = newTag;
      return this.http.post(this.TagsUrl, data)
                 .toPromise()
                 .then(response => response.json() as Tag)
                 .catch(this.handleError);
    }

    deleteTag(deleteTagId: String): Promise<String | void> {
      return this.http.delete(this.TagsUrl + '/' + deleteTagId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    updateTag(putTag: Tag): Promise<Tag | void> {
      let putUrl = this.TagsUrl + '/' + putTag._id;
      return this.http.put(putUrl, putTag)
                 .toPromise()
                 .then(response => response.json() as Tag)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}