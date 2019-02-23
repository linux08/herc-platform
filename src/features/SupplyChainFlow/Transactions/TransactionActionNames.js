export const Action = {
// moved to the transPassModal
    // find the trans and check the password
    GetOriginTrans: 'GetOriginTrans',
    // Set the Recipient trans header with the OG trans info
    SetOriginTransInfo: 'SetOriginTransInfo',
    // Set the Origin trans Password
    SetNewOriginTransPassword: 'NewOriginTransPasswordSet',

    // these are for swiper I think

    // GetAssetTransactions: 'GetAssetTransactions',
    // GotAssetTransactions: 'GotAssetTransactions',

    ClearState: 'ClearState',
    ClearEdiT: 'ClearEdiT',
    ClearImages: 'ClearImages',
    ClearDocuments: 'ClearDocuments',
    ClearMetrics: 'ClearMetrics',

    StartTransaction: 'StartTransaction',

    TransactionStarted:'TransactionStarted',
    TransactionInstantiating:'TransactionInstantiating',
    TransactionFactomEntryCompleted:'TransactionFactomEntryCompleted',
    TransactionWriteToFirebaseCompleted: 'TransactionWriteToFirebaseCompleted',
    TransactionComplete: 'TransactionComplete',


    AddPhoto: 'AddPhoto',
    AddDoc: 'AddDoc',
    AddMetrics: 'AddMetrics',
    AddEdiT: 'AddEdiT',


    SendTransaction: 'SendTransaction',
    IpfsComplete: 'IpfsComplete',
    StorjComplete: 'StorjComplete',
    FactomComplete: 'FactomComplete',
    StoreTransactionIds: 'StoreTransactionIds',


    ShowMetricModal: 'ShowMetricModal',
    // ShowCamSourceModal: 'ShowCamSourcModal',
    ShowEditModal: 'ShowEditModal',

    ShowPasswordModal: 'ShowPasswordModal',

    GetCurrentHercValue: 'GetCurrentHercValue',
    GotDynamicHercValue: 'GotDynamicHercValue',

    GotNetworkFee: 'GotNetworkFee',

    MakePayment: 'MakePayment',
    Error: 'Error',

}
