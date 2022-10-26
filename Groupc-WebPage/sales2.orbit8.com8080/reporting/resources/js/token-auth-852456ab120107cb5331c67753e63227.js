function authentication(url, username, pwd, tokenDataCallback) {
    $.ajax({
        url: url,
        type: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        processData: false,
        data: JSON.stringify({
            username: username,
            password: pwd
        }),
        success: function(res) {
            tokenDataCallback(res);
        },
        error: function(jqXHR, textStatus) {
            alert('Error');
        }
    });
};

function authenticate(requestData) {
    $('#searching-loader').show();
    $.ajax({
        url: requestData.url,
        type: "POST",
        headers: {
            'Content-Type': 'application/json',
            'licenseCode': localStorage.allowLoginCode
        },
        processData: false,
        data: JSON.stringify(requestData),
        success: function(res) {
            suppressErrors();
            if (res.error && res.error === 'USER_DISABLED') {
                $('#fpwde2').show();
            } else if (res.error && res.error === 'BAD_CREDENTIALS') {
                $('#tokenError').show();
            } else if (res.error && res.error === 'TENANT_DISABLED') {
                $('#tenantError').show();
            } else if (res.error && res.error === 'AUTH_RESTRICTED') {
                $('#authError').show();
            } else if (res.error && res.error === 'EXCELEDGE_RESTRICTED') {
                $('#excelEdgeError').show();
            } else {
                cleanupTokens();
                storeTokens(res);
                window.location.href = requestData.redirectUrl;
            }
            $('#searching-loader').remove();
        },
        error: function(jqXHR, textStatus) {
            $('#searching-loader').remove();
            $('#serverError').show();
        }
    });
};


function suppressErrors() {
    $('#usernameEmptyError').hide();
    $('#passwordEmptyError').hide();
    $('#tenantError').hide();
    $('#tokenError').hide();
    $('#invalidSessionMsg').hide();
    $('#logoutMsg').hide();
    $('#authError').hide();
    $('#fpwde2').hide();
    $('#serverError').hide();
};

function cleanupTokens() {
    localStorage.removeItem('X-Auth-Token');
    localStorage.removeItem('sessionTimeOut');
    localStorage.removeItem('isLocked');
    document.cookie = "XL-Auth-Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "ln=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

};

function cleanupRememberMe() {
    document.cookie = "remember-me=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

function cleanupTokensOnSessionExpiry(contextPath, invalidSession) {
    cleanupTokens();
    cleanupRememberMe();
    if (invalidSession == true) {
        window.location.href = contextPath + '?invalidsession=true';
    } else {
        window.location.href = contextPath + '?loggedout=true';
    }

};

function storeTokens(res) {
    localStorage.setItem('X-Auth-Token', res.token);
    localStorage.setItem('sessionTimeOut', res.sessionTimeoutMillis);
    document.cookie = "XL-Auth-Token=" + res.token + ";path=/;";
    document.cookie = "ln=" + res.languageKey + ";path=/;";
};


function swapAuthStorage() {
    var authToken = getCookie('XL-Auth-Token');
    var sessionTimeOut = getCookie('sessionTimeOut');
    var ln = getCookie('ln');
    if (authToken) {
        localStorage.setItem('X-Auth-Token', authToken);
    }

    if (sessionTimeOut) {
        localStorage.setItem('sessionTimeOut', sessionTimeOut);
    }

    if (ln) {
        localStorage.setItem('ln', ln);
    }
};

// Token based authentication logout
function tokenLogout() {
    $.ajax({
        url: 'applogout',
        type: "GET",
        data: {},
        success: function(msg) {
            cleanupTokensOnSessionExpiry(msg.contextPath, false);
        },
        error: function(jqXHR, textStatus) {}
    });
};

function refreshAuthToken() {
    $.ajax({
        url: contextPath + '/rest/secure/api/refresh-token',
        type: "GET",
        headers: {
            'Content-Type': 'application/json',
            'licenseCode': localStorage.allowLoginCode,
            'Authorization': 'Bearer ' + localStorage.getItem('X-Auth-Token')
        },
        success: function(response) {
            initializeSessionAttributes(response);
        },
        error: function() {
            window.location.href = contextPath + '?invalidsession=true';
        }
    });
};

function validateAuthToken(tokenValidateCallback) {
    $.ajax({
        url: contextPath + '/rest/public/validate-token',
        type: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('X-Auth-Token')
        },
        success: function(response) {
            initializeSessionAttributes(response);
            tokenValidateCallback(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Token validation failed');
            window.location.href = contextPath + '?invalidsession=true';
        }
    });
};

function initializeSessionAttributes(response) {
    token = response.token;
    loggedInUserName = response.username;
    var headers = {
        'ORBIT-X-Requested-With': 'XMLHttpRequest',
        'ORBIT-X-Window-With': response.username,
        'Authorization': 'Bearer ' + response.token
    };
    ORBIT.getApplication().getController('Direct').setModifiedHeaders(headers);
    cleanupTokens();
    storeTokens(response);

    if (localStorage.getItem('sessionTimeOut')) {
        ORBIT.util.SessionMonitor.maxInactive = localStorage.getItem('sessionTimeOut');
    } else {
        ORBIT.util.SessionMonitor.maxInactive = sessionTimeOutVal;
    }

    ORBIT.util.SessionMonitor.start();
};

// Token based authentication logout
function excelTokenLogout() {
    $.ajax({
        url: 'applogout',
        type: "GET",
        data: {},
        success: function(msg) {
            cleanupTokens();

            window.location.href = msg.contextPath +
                '?loggedout=true&excel=Y';
        },
        error: function(jqXHR, textStatus) {}
    });
};

// Token based authentication logout
function tokenInvalidLogout() {
    $.ajax({
        url: 'applogout',
        type: "GET",
        data: {},
        success: function(msg) {
            cleanupTokensOnSessionExpiry(msg.contextPath, true);
        },
        error: function(jqXHR, textStatus) {}
    });
};



function getCookie(name) {
    var cookieArr = document.cookie.split(";");

    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
};