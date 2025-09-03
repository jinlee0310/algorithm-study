#include <iostream>
#include <algorithm>

using namespace std;

int main()
{
    int a,b,c;

    while(1){
        cin >> a >> b >> c;
        if(a==0 && b==0 && c==0) break;

        int longest=max({a,b,c});
        int shortest=min({a,b,c});
        int rest;

        if(a!=longest&&a!=shortest) rest=a;
        if(b!=longest&&b!=shortest) rest=b;
        if(c!=longest&&c!=shortest) rest=c;

        if((shortest*shortest)+(rest*rest)==(longest*longest)){
            cout << "right" << "\n";
        }else{
            cout << "wrong" << "\n";
        }

    }

    return 0;
}