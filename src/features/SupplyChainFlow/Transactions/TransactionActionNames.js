export const Action = {
// moved to the transPassModal
    // find the trans and check the password
    GetOriginTrans: 'GetOriginTrans',
    // Set the Recipient trans header with the OG trans info
    SetOriginTransInfo: 'SetOriginTransInfo',
    // Set the Origin trans Password
    SetNewOriginTransPassword: 'NewOriginTransPasswordSet',
    
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
    // ShowCamSourceModal: 'ShowCamSourcModal',
    ShowEditModal: 'ShowEditModal',
    
    ShowPasswordModal: 'ShowPasswordModal',
  
    GetCurrentHercValue: 'GetCurrentHercValue',
    GotDynamicHercValue: 'GotDynamicHercValue',

    GotNetworkFee: 'GotNetworkFee',
    
    MakePayment: 'MakePayment',
    Error: 'Error',

}