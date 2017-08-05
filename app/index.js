import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import './styles/main.scss';


//这里要去掉，因为在App组件中是判断的undefined
/*let initUinfo = {
    isComplete : 0,
    profile : {truename:null, school_id:null, xi_id:null, nianji_id:null, banji_id:null}
}*/
const store = configureStore({
    //uinfo : initUinfo
});
const history = syncHistoryWithStore(hashHistory, store);

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
