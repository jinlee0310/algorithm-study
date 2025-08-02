#include <iostream>
using namespace std;

int main()
{
    int score;
    
    cin >> score;

    if(90<=score){
        cout << "A";
    }else if(80<=score){
        cout << "B";
    }else if(70<=score){
        cout << "C";
    }else if(60<=score){
        cout << "D";
    }else{
        cout << "F";
    }

    return 0;
}