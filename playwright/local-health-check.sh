HEADERS=`curl -Is --connect-timeout ${1-5} http://localhost:3000/booking/actuator/health`
CURLSTATUS=$?

# Check for timeout
if [ $CURLSTATUS -eq 28 ]
    then
        echo FALSE
else
    # Check HTTP status code
    HTTPSTATUS=`echo $HEADERS | grep HTTP | cut -d' ' -f2`
    if [ $HTTPSTATUS -le 399 ]
        then
            echo TRUE
    else
        echo FALSE
    fi
fi


HEADERS=`curl -Is --connect-timeout ${1-5} http://localhost:3002/branding/actuator/health`
CURLSTATUS=$?

# Check for timeout
if [ $CURLSTATUS -eq 28 ]
    then
        echo FALSE
else
    # Check HTTP status code
    HTTPSTATUS=`echo $HEADERS | grep HTTP | cut -d' ' -f2`
    if [ $HTTPSTATUS -le 399 ]
        then
            echo TRUE
    else
        echo FALSE
    fi
fi



HEADERS=`curl -Is --connect-timeout ${1-5} http://localhost:3004/auth/actuator/health`
CURLSTATUS=$?

# Check for timeout
if [ $CURLSTATUS -eq 28 ]
    then
        echo FALSE
else
    # Check HTTP status code
    HTTPSTATUS=`echo $HEADERS | grep HTTP | cut -d' ' -f2`
    if [ $HTTPSTATUS -le 399 ]
        then
            echo TRUE
    else
        echo FALSE
    fi
fi




HEADERS=`curl -Is --connect-timeout ${1-5} http://localhost:3005/report/actuator/health`
CURLSTATUS=$?

# Check for timeout
if [ $CURLSTATUS -eq 28 ]
    then
        echo FALSE
else
    # Check HTTP status code
    HTTPSTATUS=`echo $HEADERS | grep HTTP | cut -d' ' -f2`
    if [ $HTTPSTATUS -le 399 ]
        then
            echo TRUE
    else
        echo FALSE
    fi
fi




HEADERS=`curl -Is --connect-timeout ${1-5} http://localhost:3006/message/actuator/health`
CURLSTATUS=$?

# Check for timeout
if [ $CURLSTATUS -eq 28 ]
    then
        echo FALSE
else
    # Check HTTP status code
    HTTPSTATUS=`echo $HEADERS | grep HTTP | cut -d' ' -f2`
    if [ $HTTPSTATUS -le 399 ]
        then
            echo TRUE
    else
        echo FALSE
    fi
fi

