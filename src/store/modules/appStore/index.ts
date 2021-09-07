import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { ModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';

@Module({ namespaced: true, name: 'appStore' })
export default class AppStore extends VuexModule {
  public processing: boolean;
  constructor() {
    super(<ModuleOptions>{});
    this.processing = false;
  }
  @Mutation
  updatingProcessing(processing: boolean): void {
    this.processing = processing;
  }  
  get getProcessing(): boolean {
    return this.processing;
  }
}