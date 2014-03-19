package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends Controller {

    public static void index() {
        render();
    }

    public static void create() {
        String id = "";
        UUID uuid = UUID.randomUUID();
        id = uuid.toString().substring(0, 5);
        redirect("/" + id);
    }

    public static void content(String id) {
        render(id);
    }

    public static void load(String id) {
        //Page page = null;
        Object response = null;

        try {
            response = PageStore.get(id);
        }
        catch(Exception ex) {
            response = ex.getMessage();
        }

        renderJSON(response);
    }

    public static void save() {

    }

}