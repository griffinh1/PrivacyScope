import sqlite3

DATABASE = 'datadir/crawl-data.sqlite'

def getHttpRedirects(browser_id):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT new_request_url FROM http_redirects "
                "WHERE browser_id = {}".format(browser_id))
    sql_results = [r[0] for r in cur.fetchall()]
    cur.close()
    conn.close()
    results = {'count' : len(sql_results),
               'redirects' : sql_results}
    return(results)

def getJavascriptCookies(browser_id):
    conn = sqlite3.connect(DATABASE)
    cur = conn.cursor()
    cur.execute("SELECT host FROM javascript_cookies "
                "WHERE browser_id = {}".format(browser_id))
    sql_results = [r[0] for r in cur.fetchall()]
    cur.close()
    conn.close()
    results = {'count' : len(sql_results),
               'hosts' : list(set(sql_results))}
    return(results)
