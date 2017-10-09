package sample;


import javafx.geometry.Bounds;
import javafx.geometry.Point2D;
import javafx.geometry.Point3D;
import javafx.scene.Node;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;


public class Pixel extends Rectangle{
    int col;

    public Pixel(int colInit,int rowInit){
        super(Main.blocksize,Main.blocksize);
        col=colInit;

        this.setFill(Color.LIGHTBLUE);
        this.relocate(colInit*Main.blocksize,rowInit*Main.blocksize);
    }

    public void move(int newCol,int newRow){
        this.relocate(this.getLayoutX()+newCol*Main.blocksize,this.getLayoutY()+newRow*Main.blocksize);
    }

    public boolean collided(Node other){
        return this.getBoundsInLocal().intersects(other.getBoundsInLocal());
    }
}
