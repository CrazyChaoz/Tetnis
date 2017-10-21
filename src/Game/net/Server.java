package Game.net;

import java.io.*;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;


public class Server {
    public Server(int port) {
        try {
            System.out.println(InetAddress.getByName("localhost"));
        }catch (Exception e){}
        try(ServerSocket server=new ServerSocket(port);
            Socket client=server.accept();
            PrintWriter out=new PrintWriter(client.getOutputStream(),true);
            BufferedReader in=new BufferedReader(new InputStreamReader(client.getInputStream()))){
            out.println(Worker.userName);
            System.out.println(in.readLine());
        }catch (Exception e){e.printStackTrace();}
    }
}
