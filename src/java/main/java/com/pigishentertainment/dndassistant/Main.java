package main.java.com.pigishentertainment.dndassistant;

import java.sql.SQLException;

public class Main {

  public static void main(String[] args) {
    try {
      DBManager manager = new DBManager();
      
      try {
        manager.printAllMonsterNames();
      } catch (SQLException e) {
        System.out.println("Failed to print table data: " + e.toString());
      }

      manager.shutdown();
    } catch (SQLException e) {
      System.out.println("Failed to connect to database: " + e.toString());
    } catch (ClassNotFoundException e) {
      System.out.println("Failed to find org.postgresql.Driver: " + e.toString());
    }
  }
}
