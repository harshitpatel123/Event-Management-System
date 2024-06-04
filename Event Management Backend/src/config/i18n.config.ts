import { AcceptLanguageResolver, I18nOptions } from 'nestjs-i18n';
import * as path from 'path';
import { CONSTANT } from './constant.config';

const I18N_CONFIG = CONSTANT.I18N_CONFIG_CONSTANT;

export const i18nConfig: I18nOptions = {
    fallbackLanguage: I18N_CONFIG.FALLBACK_LANGUAGE,
    loaderOptions: {
        path: path.join(__dirname, '..', I18N_CONFIG.ROOT_FOLDER),
        watch: true,
    },
    resolvers: [AcceptLanguageResolver],
};
