/// <reference types="node" />

// Type definitions for ussd-menu-builder 1.0.0
// Project: ussd-menu-builder
// Definitions by: Jason Schapiro <yono38@gmail.com>

import { EventEmitter } from "events";

export = UssdMenu;

declare class UssdState {
    constructor(menu: UssdMenu);

    defaultNext?: string;

    menu: UssdMenu;

    name: string;

    run(): void;

    val: string;
}

declare class UssdMenu extends EventEmitter {
    constructor(opts?: UssdMenu.UssdMenuOptions);

    session: any;
    provider: UssdMenu.UssdMenuProvider;
    args: UssdMenu.UssdGatewayArgs;
    states: Array<UssdState>;
    result: string;
    val: string;

    callOnResult(): void;

    con(text: string): void;

    end(text: string): void;

    getRoute(args: UssdMenu.UssdGatewayArgs | UssdMenu.HubtelArgs | UssdMenu.NaloArgs | UssdMenu.ArkeselArgs | UssdMenu.SouthPawslArgs): Promise<string>;

    go(state: string): void;

    goStart(): void;

    mapArgs(args: UssdMenu.UssdGatewayArgs | UssdMenu.HubtelArgs | UssdMenu.NaloArgs | UssdMenu.ArkeselArgs | UssdMenu.SouthPawslResponse): UssdMenu.UssdGatewayArgs;


    onResult?(result: string | UssdMenu.HubtelResponse | UssdMenu.NaloResponse| UssdMenu.ArkeselResponse | UssdMenu.SouthPawslResponse): void;

    resolveRoute(route: string, callback: Function): void;

    resolve?(value: string): void;

    run(args: UssdMenu.UssdGatewayArgs, onResult?: Function): Promise<string>;

    runState(state: UssdState): void;

    sessionConfig(config: UssdMenu.UssdSessionConfig): void;

    startState(options: UssdMenu.UssdStateOptions): void;

    state(name: string, options: UssdMenu.UssdStateOptions): UssdMenu;

    testLinkRule(rule: string, val: string): boolean;

    static START_STATE: string;
}

/*~ If you want to expose types from your module as well, you can
 *~ place them in this block.
 */
declare namespace UssdMenu {
    interface NextState {
        [state: string]: Function | string;
    }

    interface UssdGatewayArgs {
        text: string;
        phoneNumber: string;
        // operator: string;
        sessionId: string;
        serviceCode: string;
    }

    interface HubtelResponse {
        Type: 'Response' | 'Release';
        Message: string;
    }

    interface HubtelArgs {
        Mobile: string;
        SessionId: string;
        ServiceCode: string;
        Type: 'Initiation' | 'Response' | 'Release' | 'Timeout';
        Message: string;
        Operator: 'Tigo' | 'Airtel' | 'MTN' | 'Vodafone' | 'Safaricom';
        Sequence: number;
        ClientState?: any;
    }

    interface NaloResponse {
        USERID: string,
        MSISDN: string,
        MSGTYPE: true | false;
        MSG: string;
    }

    interface NaloArgs {
        USERID: string
        MSISDN: string;
        MSGTYPE: true | false;
        USERDATA: string;
        NETWORK: 'Tigo' | 'Airtel' | 'MTN' | 'Vodafone' | 'Glo';
    }

    interface ArkeselResponse {
        sessionID: string;
        userID: string;
        msisdn: string;
        continueSession: true | false;
        message: string;
    }

    interface ArkeselArgs {
        sessionID: string;
        userID: string;
        newSession: true | false;
        msisdn: string;
        userData: string;
        network: 'Tigo' | 'Airtel' | 'AirtelTigo' | 'MTN' | 'Vodafone' | 'Glo';
    }

    interface SouthPawslResponse {
        menuId: string,
        ussdString: string,
        option: string,
        state: true | false;
        ussdParameters: any[];
        message: string;
    }

    interface SouthPawslArgs {
        sessionId: string,
        menuId: string,
        ussdState: string,
        ussdString: string,
        ussdParameters: any[];
        possibleAnswers: string;
        msisdn: string;
        inputOption: string;
        network: 'Tigo' | 'Airtel' | 'AirtelTigo' | 'MTN' | 'Vodafone' | 'Glo';
    }

    type UssdMenuProvider = 'africasTalking' | 'hubtel' | 'emergent';
    interface UssdMenuOptions {
        provider?: UssdMenuProvider;
    }
    
    interface UssdStateOptions {
        run(): void;
        next?: NextState;
        defaultNext?: string;
    }
    
    interface UssdSessionConfig {
        start(sessionId: string, callback?: Function): (Promise<any> | void);
    
        end(sessionId: string, callback?: Function): (Promise<any> | void);
    
        get(sessionId: string, key: string, callback?: Function): (Promise<any> | void);
    
        set(sessionId: string, key: string, value: any, callback?: Function): (Promise<any> | void);
    }
}

