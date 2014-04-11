package models;

import org.lightcouch.CouchDbClient;
import org.lightcouch.Response;


public class PageStore {

    public static Page get(String pageId) {
        CouchDbClient client = new CouchDbClient();
        Page page = client.find(Page.class, pageId);
        return page;
    }

    public static String update(Page page) {

        String result = "";

        try {
            CouchDbClient client = new CouchDbClient();
            Response response = client.update(page);
            result = response.toString();
        }
        catch (Exception ex) {
            result = ex.getMessage();
        }

        return result;
    }

    public static String save(Page page) {

        String result = "";

        try {
            CouchDbClient client = new CouchDbClient();
            Response response;
            if (client.contains(page.get_id())) {
                response = client.update(page);
            }
            else {
                response = client.save(page);
            }
            result = response.toString();
        }
        catch (Exception ex) {
            result = ex.getMessage();
        }

        return result;
    }

}
