#include <iostream>
#include <string>
#include <stack>

using namespace std;

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    stack <int> s;

    int N;
    cin >> N;
    while(N--){
       string op;
       cin >> op;
       
       if(op=="push"){
         int val;
         cin >> val;
         s.push(val);
       }else if(op=="top"){
        if(s.empty()){
            cout << -1 << "\n";
        }else{
            cout << s.top() << "\n";   
        }
       }else if(op=="size"){
        cout << s.size() << "\n";
       }else if(op=="pop"){
        if(s.empty()){
            cout << -1 << "\n";
        }else{
            cout << s.top() << "\n";
            s.pop();
        }
       }else{
        if(s.empty()){
            cout << 1 << "\n";
        }else{
            cout << 0 << "\n";
        }
       }
    }

    return 0;
}