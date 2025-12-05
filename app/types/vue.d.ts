import {IConf} from '~/plugins/services/conf'
import {IGlob} from "~/plugins/services/glob";

declare module 'vue/types/vue' {
  export interface Vue {
    $conf: IConf
    $glob: IGlob
  }
}
