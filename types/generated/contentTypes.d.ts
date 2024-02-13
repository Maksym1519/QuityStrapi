import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAboutAbout extends Schema.CollectionType {
  collectionName: 'abouts';
  info: {
    singularName: 'about';
    pluralName: 'abouts';
    displayName: 'about';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mainTitle: Attribute.RichText;
    mainText1: Attribute.Text;
    mainText2: Attribute.Text;
    mainText3: Attribute.Text;
    mainText4: Attribute.Text;
    author: Attribute.String;
    quoteText: Attribute.Text;
    reasonesIcones: Attribute.Media;
    managerImage: Attribute.Media;
    managerQuote: Attribute.Text;
    managerName: Attribute.String;
    telegramLogo: Attribute.Media;
    telegramBlue: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::about.about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::about.about',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAgreementAgreement extends Schema.CollectionType {
  collectionName: 'agreements';
  info: {
    singularName: 'agreement';
    pluralName: 'agreements';
    displayName: 'agreement';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mainTitle: Attribute.String;
    subjectTitle: Attribute.RichText;
    subjectText: Attribute.Text;
    orderTitle: Attribute.RichText;
    orderText: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::agreement.agreement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::agreement.agreement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlockChainBlogBlockChain extends Schema.CollectionType {
  collectionName: 'blog_block_chains';
  info: {
    singularName: 'blog-block-chain';
    pluralName: 'blog-block-chains';
    displayName: 'blogBlockChain';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blogBlockChainImage: Attribute.Media;
    blogBlockChainCategory: Attribute.String;
    blogBlockChainTitle: Attribute.String;
    timeToRead: Attribute.String;
    list: Attribute.Text;
    h2: Attribute.RichText;
    h3: Attribute.RichText;
    text1: Attribute.Text;
    boldText: Attribute.Text;
    author: Attribute.String;
    text2: Attribute.Text;
    listRow1: Attribute.Text;
    listRow2: Attribute.Text;
    listRow3: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-block-chain.blog-block-chain',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-block-chain.blog-block-chain',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogCloudMiningBlogCloudMining
  extends Schema.CollectionType {
  collectionName: 'blog_cloud_minings';
  info: {
    singularName: 'blog-cloud-mining';
    pluralName: 'blog-cloud-minings';
    displayName: 'blogCloudMining';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blogCloudMiningImage: Attribute.Media;
    blogCloudMiningCategory: Attribute.String;
    blogCloudMiningTitle: Attribute.String;
    timeToRead: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-cloud-mining.blog-cloud-mining',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-cloud-mining.blog-cloud-mining',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogEquipmentBlogEquipment extends Schema.CollectionType {
  collectionName: 'blog_equipments';
  info: {
    singularName: 'blog-equipment';
    pluralName: 'blog-equipments';
    displayName: 'blogEquipment';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blogEquipmentImage: Attribute.Media;
    blogEquipmentCategory: Attribute.String;
    blogEquipmentTitle: Attribute.String;
    timeToRead: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-equipment.blog-equipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-equipment.blog-equipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogImageBlogImage extends Schema.CollectionType {
  collectionName: 'blog_images';
  info: {
    singularName: 'blog-image';
    pluralName: 'blog-images';
    displayName: 'blogImages';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    telegramLogo: Attribute.Media;
    telegramButtonBG: Attribute.Media;
    telegramButtonBGblue: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-image.blog-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-image.blog-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogInvestitionBlogInvestition
  extends Schema.CollectionType {
  collectionName: 'blog_investitions';
  info: {
    singularName: 'blog-investition';
    pluralName: 'blog-investitions';
    displayName: 'blogInvestition';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blogInvestitionImage: Attribute.Media;
    blogInvestitionCategory: Attribute.String;
    blogInvestitionTitle: Attribute.String;
    timeToRead: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-investition.blog-investition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-investition.blog-investition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogItemBlogItem extends Schema.CollectionType {
  collectionName: 'blog_items';
  info: {
    singularName: 'blog-item';
    pluralName: 'blog-items';
    displayName: 'BlogItem';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blogImage: Attribute.Media;
    blogCategory: Attribute.String;
    blogTitle: Attribute.String;
    timeToRead: Attribute.String;
    h2: Attribute.RichText;
    h3: Attribute.RichText;
    text1: Attribute.Text;
    boldText: Attribute.Text;
    author: Attribute.String;
    text2: Attribute.Text;
    list: Attribute.Text;
    listRow1: Attribute.Text;
    listRow2: Attribute.Text;
    listRow3: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-item.blog-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-item.blog-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCatalogFarmCatalogFarm extends Schema.CollectionType {
  collectionName: 'catalog_farms';
  info: {
    singularName: 'catalog-farm';
    pluralName: 'catalog-farms';
    displayName: 'catalogFarm';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    itemImage: Attribute.Media;
    title: Attribute.String;
    popularity: Attribute.String;
    price: Attribute.String;
    ths: Attribute.String;
    w: Attribute.String;
    jth: Attribute.String;
    sort: Attribute.String;
    presence: Attribute.String;
    test: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::catalog-farm.catalog-farm',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::catalog-farm.catalog-farm',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCatalogGpuCatalogGpu extends Schema.CollectionType {
  collectionName: 'catalog_gpus';
  info: {
    singularName: 'catalog-gpu';
    pluralName: 'catalog-gpus';
    displayName: 'catalogGpu';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    itemImage: Attribute.Media;
    title: Attribute.String;
    popularity: Attribute.String;
    price: Attribute.String;
    ths: Attribute.String;
    w: Attribute.String;
    jth: Attribute.String;
    sort: Attribute.String;
    presence: Attribute.String;
    test: Attribute.String;
    avaEmpty: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::catalog-gpu.catalog-gpu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::catalog-gpu.catalog-gpu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCatalogHardCatalogHard extends Schema.CollectionType {
  collectionName: 'catalog_hards';
  info: {
    singularName: 'catalog-hard';
    pluralName: 'catalog-hards';
    displayName: 'catalogHard';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    itemImage: Attribute.Media;
    title: Attribute.String;
    popularity: Attribute.String;
    price: Attribute.String;
    ths: Attribute.String;
    w: Attribute.String;
    jth: Attribute.String;
    sort: Attribute.String;
    presence: Attribute.String;
    test: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::catalog-hard.catalog-hard',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::catalog-hard.catalog-hard',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCatalogItemCatalogItem extends Schema.CollectionType {
  collectionName: 'catalog_items';
  info: {
    singularName: 'catalog-item';
    pluralName: 'catalog-items';
    displayName: 'catalogItem';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    itemImage: Attribute.Media;
    title: Attribute.String;
    price: Attribute.String;
    ths: Attribute.String;
    w: Attribute.String;
    jth: Attribute.String;
    sort: Attribute.String;
    presence: Attribute.String;
    popularity: Attribute.String;
    condition: Attribute.String;
    profit: Attribute.Integer;
    maker: Attribute.String;
    algorithm: Attribute.String;
    sliderMiniatur: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::catalog-item.catalog-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::catalog-item.catalog-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCatalogSpareCatalogSpare extends Schema.CollectionType {
  collectionName: 'catalog_spares';
  info: {
    singularName: 'catalog-spare';
    pluralName: 'catalog-spares';
    displayName: 'catalogSpare';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    itemImage: Attribute.Media;
    title: Attribute.String;
    popularity: Attribute.String;
    price: Attribute.String;
    ths: Attribute.String;
    w: Attribute.String;
    jth: Attribute.String;
    sort: Attribute.String;
    presence: Attribute.String;
    test: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::catalog-spare.catalog-spare',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::catalog-spare.catalog-spare',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClientClient extends Schema.CollectionType {
  collectionName: 'clients';
  info: {
    singularName: 'client';
    pluralName: 'clients';
    displayName: 'client';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fullName: Attribute.String;
    email: Attribute.Email;
    password: Attribute.String;
    phone: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContactContact extends Schema.CollectionType {
  collectionName: 'contacts';
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'contacts';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    officeAddress: Attribute.String;
    phone: Attribute.String;
    email: Attribute.Email;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.CollectionType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'Footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    whatsUp: Attribute.Media;
    viber: Attribute.Media;
    telegram: Attribute.Media;
    location: Attribute.Media;
    LTCLogo: Attribute.Media;
    BCHlogo: Attribute.Media;
    XRPlogo: Attribute.Media;
    ETHlogo: Attribute.Media;
    BTClogo: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Schema.CollectionType {
  collectionName: 'headers';
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'header';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    watsUp: Attribute.Media;
    viber: Attribute.Media;
    telegram: Attribute.Media;
    emptyAvatar: Attribute.Media;
    warning: Attribute.Media;
    logo: Attribute.Media;
    arrowNaviigation: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHostingHosting extends Schema.CollectionType {
  collectionName: 'hostings';
  info: {
    singularName: 'hosting';
    pluralName: 'hostings';
    displayName: 'hosting';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    deployVideo: Attribute.Media;
    deployBlueBg: Attribute.Media;
    casesImage: Attribute.Media;
    deployInfoArrow: Attribute.Media;
    hostingCalendar: Attribute.Media;
    hostingTime: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hosting.hosting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hosting.hosting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHostingSchemeHostingScheme extends Schema.CollectionType {
  collectionName: 'hosting_schemes';
  info: {
    singularName: 'hosting-scheme';
    pluralName: 'hosting-schemes';
    displayName: 'hostingScheme';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    text: Attribute.String;
    icon: Attribute.Media;
    imgBg: Attribute.Media;
    imagePhone: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hosting-scheme.hosting-scheme',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hosting-scheme.hosting-scheme',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHostingTermHostingTerm extends Schema.CollectionType {
  collectionName: 'hosting_terms';
  info: {
    singularName: 'hosting-term';
    pluralName: 'hosting-terms';
    displayName: 'hostingTerm';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    subTitle: Attribute.String;
    icon: Attribute.Media;
    itemTitle: Attribute.String;
    itemText: Attribute.String;
    itemLink: Attribute.String;
    mainImage: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hosting-term.hosting-term',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hosting-term.hosting-term',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIconeIcone extends Schema.CollectionType {
  collectionName: 'icones';
  info: {
    singularName: 'icone';
    pluralName: 'icones';
    displayName: 'Icones';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    edit: Attribute.Media;
    bucket: Attribute.Media;
    show: Attribute.Media;
    hide: Attribute.Media;
    calendar: Attribute.Media;
    search: Attribute.Media;
    flag: Attribute.Media;
    menu: Attribute.Media;
    trolley: Attribute.Media;
    shopCatalogArrow: Attribute.Media;
    play: Attribute.Media;
    workingStep: Attribute.Media;
    blackMessengarsIcones: Attribute.Media;
    questionPlus: Attribute.Media;
    questionMinus: Attribute.Media;
    prevQuestionIcon: Attribute.Media;
    avaEmpty: Attribute.Media;
    timeIconBlog: Attribute.Media;
    dotBlogItem: Attribute.Media;
    geotag: Attribute.Media;
    filterAttention: Attribute.Media;
    filterBird: Attribute.Media;
    filterCondition: Attribute.Media;
    sliderPrev: Attribute.Media;
    sliderNext: Attribute.Media;
    star: Attribute.Media;
    chatIcon: Attribute.Media;
    whiteBucket: Attribute.Media;
    locationIcon: Attribute.Media;
    chartIcon: Attribute.Media;
    courseState: Attribute.Media;
    bucketActive: Attribute.Media;
    close: Attribute.Media;
    attentionTriangle: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::icone.icone',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::icone.icone',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    Image: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProfileProfile extends Schema.CollectionType {
  collectionName: 'profiles';
  info: {
    singularName: 'profile';
    pluralName: 'profiles';
    displayName: 'profile';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    fullName: Attribute.String;
    email: Attribute.String;
    birthday: Attribute.String;
    address: Attribute.String;
    phone: Attribute.String;
    avatar: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPublicOfferPublicOffer extends Schema.CollectionType {
  collectionName: 'public_offers';
  info: {
    singularName: 'public-offer';
    pluralName: 'public-offers';
    displayName: 'publicOffer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    subjectText: Attribute.RichText;
    mainTitle: Attribute.String;
    subjectTitle: Attribute.RichText;
    orderTitle: Attribute.RichText;
    orderText: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::public-offer.public-offer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::public-offer.public-offer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuickDeployQuickDeploy extends Schema.CollectionType {
  collectionName: 'quick_deploys';
  info: {
    singularName: 'quick-deploy';
    pluralName: 'quick-deploys';
    displayName: 'quickDeploy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    circleBg: Attribute.Media;
    icon: Attribute.Media;
    title: Attribute.String;
    text: Attribute.String;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quick-deploy.quick-deploy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::quick-deploy.quick-deploy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRequisiteRequisite extends Schema.CollectionType {
  collectionName: 'requisites';
  info: {
    singularName: 'requisite';
    pluralName: 'requisites';
    displayName: 'requisites';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mainTitle: Attribute.String;
    aboutCompanyTitle: Attribute.String;
    bankRequisiteTitle: Attribute.String;
    nameCompany: Attribute.String;
    idNumber: Attribute.String;
    ogrn: Attribute.String;
    phone: Attribute.String;
    email: Attribute.Email;
    nameBank: Attribute.String;
    rs: Attribute.String;
    ks: Attribute.String;
    iban: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::requisite.requisite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::requisite.requisite',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReturnReturn extends Schema.CollectionType {
  collectionName: 'returns';
  info: {
    singularName: 'return';
    pluralName: 'returns';
    displayName: 'return';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    mainTitle: Attribute.String;
    text: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::return.return',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::return.return',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShopShop extends Schema.CollectionType {
  collectionName: 'shops';
  info: {
    singularName: 'shop';
    pluralName: 'shops';
    displayName: 'shop';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    minersImages: Attribute.Media;
    minersIcones: Attribute.Media;
    advertismentBgMining: Attribute.Media;
    advertismentBgRepair: Attribute.Media;
    paybackBg: Attribute.Media;
    shopSheme: Attribute.Media;
    servicesIcon: Attribute.Media;
    couponImages: Attribute.Media;
    sliderImages: Attribute.Media;
    bonusesArrow: Attribute.Media;
    managerAvatar: Attribute.Media;
    arrowLeft: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::shop.shop', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::about.about': ApiAboutAbout;
      'api::agreement.agreement': ApiAgreementAgreement;
      'api::blog-block-chain.blog-block-chain': ApiBlogBlockChainBlogBlockChain;
      'api::blog-cloud-mining.blog-cloud-mining': ApiBlogCloudMiningBlogCloudMining;
      'api::blog-equipment.blog-equipment': ApiBlogEquipmentBlogEquipment;
      'api::blog-image.blog-image': ApiBlogImageBlogImage;
      'api::blog-investition.blog-investition': ApiBlogInvestitionBlogInvestition;
      'api::blog-item.blog-item': ApiBlogItemBlogItem;
      'api::catalog-farm.catalog-farm': ApiCatalogFarmCatalogFarm;
      'api::catalog-gpu.catalog-gpu': ApiCatalogGpuCatalogGpu;
      'api::catalog-hard.catalog-hard': ApiCatalogHardCatalogHard;
      'api::catalog-item.catalog-item': ApiCatalogItemCatalogItem;
      'api::catalog-spare.catalog-spare': ApiCatalogSpareCatalogSpare;
      'api::client.client': ApiClientClient;
      'api::contact.contact': ApiContactContact;
      'api::footer.footer': ApiFooterFooter;
      'api::header.header': ApiHeaderHeader;
      'api::hosting.hosting': ApiHostingHosting;
      'api::hosting-scheme.hosting-scheme': ApiHostingSchemeHostingScheme;
      'api::hosting-term.hosting-term': ApiHostingTermHostingTerm;
      'api::icone.icone': ApiIconeIcone;
      'api::product.product': ApiProductProduct;
      'api::profile.profile': ApiProfileProfile;
      'api::public-offer.public-offer': ApiPublicOfferPublicOffer;
      'api::quick-deploy.quick-deploy': ApiQuickDeployQuickDeploy;
      'api::requisite.requisite': ApiRequisiteRequisite;
      'api::return.return': ApiReturnReturn;
      'api::shop.shop': ApiShopShop;
    }
  }
}
