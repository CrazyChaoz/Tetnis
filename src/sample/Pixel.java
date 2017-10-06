package sample;

import javafx.scene.Group;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.Shape;


public class Pixel extends Group{
    Shape view;
    public Pixel(int colIndex,int rowIndex){
        view=new Rectangle(32,32);
        view.setFill(Color.LIGHTBLUE);
        view.relocate(colIndex*Main.blocksize,rowIndex*Main.blocksize);
    }
}
