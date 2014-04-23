package models;

import play.Play;

import java.io.File;

/**
 * Created with IntelliJ IDEA.
 * User: magnus
 * Date: 2014-04-15
 * Time: 10:31
 * To change this template use File | Settings | File Templates.
 */
public class UploadPathHelpers {
    public static String getPublicPath(String pageId, String fileId) {
        return File.separator + "public/uploads"+ File.separator + pageId + File.separator + fileId + ".jpg";
    }

    public static File getPath(String pageId, String fileId) {
        String publicPath = File.separator + "public/uploads"+ File.separator + pageId;
        String fullTarget = Play.getFile("").getAbsolutePath() + publicPath;
        String filePath = fullTarget + File.separator + fileId + ".jpg";
        File folder = new File(fullTarget);
        if (!folder.exists()) {
            folder.mkdir();
        }
        File file = new File(filePath);
        return file;
    }
}
