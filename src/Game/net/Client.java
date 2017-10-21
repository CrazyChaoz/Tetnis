package Game.net;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.Socket;


public class Client {

    public Client(String host,int port) {
        try(Socket client=new Socket(InetAddress.getByName(host),port);
            PrintWriter out=new PrintWriter(client.getOutputStream(),true);
            BufferedReader in=new BufferedReader(new InputStreamReader(client.getInputStream()))){
            out.println(Worker.userName);
            System.out.println(in.readLine());
        }catch (Exception e){e.printStackTrace();}
    }
}
