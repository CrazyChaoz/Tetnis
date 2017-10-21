package Game.net;

import javafx.application.Platform;
import javafx.concurrent.Task;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by testuser on 21.10.2017.
 */
public class Worker {
    public static String userName;
    public static List<String> inputQueue=new ArrayList();

    public static void startServer(){
        Task<Void> server=new Task<Void>() {
            @Override
            protected Void call() throws Exception {
                Platform.runLater(()->{
                    new Server(23456);
                });
                return null;
            }
        };
        new Thread(server).start();
    }

    public static void startClient(){
        Task<Void> client=new Task<Void>() {
            @Override
            protected Void call() throws Exception {
                Platform.runLater(()->{
                    new Client("localhost",23456);
                });
                return null;
            }
        };
        new Thread(client).start();
    }

    public String getLastInputs(){
        StringBuilder sb=new StringBuilder();
        for (String s:inputQueue){
            sb.append(s);
            sb.append(";");
        }

        return sb.toString();
    }
}
