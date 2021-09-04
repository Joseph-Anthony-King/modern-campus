import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';

@Module({ namespaced: true, name: 'ApiModule' })
export default class ApiModule extends VuexModule {
  public apiUrl: string;
  public apiKey: string;
  constructor() {
    super(<ModuleOptions>{});
    this.apiUrl = '';
    this.apiKey = '';
  }
  @Mutation
  updateApiUrl(url: string): void {
    this.apiUrl = url;
  }
  @Mutation
  updateApiKey(key: string): void {
    this.apiKey = key;
  }
  get getApiUrl(): string {
    return this.apiUrl;
  }
  get getApiKey(): string {
    return this.apiKey;
  }
}