export class CONSTANT {
    
    static readonly MAIN_CONSTANT = {
        STATIC_FOLDER: 'public',
        OPEN_API_PATH: 'api',
        GLOB_PREFIX: 'api'
    }

    static readonly APP_CONFIG_CONSTANT = {
        GLOBAL: true,
        ENV_FILE_PATH: '.env',
    };

    static readonly SWAGGER_CONFIG_CONSTANT = {
        TITLE: 'QE-TEAM-CRM',
        DESCRIPTION: 'The qe-team-crm project API',
        VERSION: '1.0',
        TAGS_SORTER: 'alpha',
        DOC_EXPANSION: 'none',
    };

    static readonly I18N_CONFIG_CONSTANT = {
        FALLBACK_LANGUAGE: 'en',
        ROOT_FOLDER: '/i18n/'
    }

    static readonly PAGINATE = {
        PAGE: '1',
        LIMIT: '10'
    }
}
