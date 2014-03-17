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
        redirect("/content/" + id);
    }

    public static void content(String id) {
        render(id);
    }

    public static void save() {

    }

}