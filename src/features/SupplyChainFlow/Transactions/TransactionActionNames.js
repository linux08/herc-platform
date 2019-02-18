export const Action = {
// moved to the transPassModal
    GetOriginTrans: 'GetOriginTrans',
    SetOriginTransInfo: 'SetOriginTransInfo',

    SetOriginTransPassword: 'SetOriginTransPassword',
    //  not sure what these are is for
    // GetAssetTransactions: 'GetAssetTransactions',
    // GotAssetTransactions: 'GotAssetTransactions',


    ClearState: 'ClearState',

    StartTransaction: 'StartTransaction',
    
    AddPhoto: 'AddPhoto',
    AddDoc: 'AddDoc',
    AddMetrics: 'AddMetrics',
    AddEdiT: 'AddEdiT',

    SendTransaction: 'SendTransaction',
    IpfsComplete: 'IpfsComplete',
    StorjComplete: 'StorjComplete',
    FactomComplete: 'FactomComplete',
    TransactionComplete: 'TransactionComplete',


    ShowMetricModal: 'ShowMetricModal',
    ShowCamSourceModal: 'ShowCamSourcModal',
    ShowEditModal: 'ShowEditModal',
    ShowPasswordModal: 'ShowPasswordModal',
  
    GetCurrentHercValue: 'GetCurrentHercValue',
    GotDynamicHercValue: 'GotDynamicHercValue',

    GotNetworkFee: 'GotNetworkFee',
    
    MakePayment: 'MakePayment',
    Error: 'Error',

}